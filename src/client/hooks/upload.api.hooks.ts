import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { useUploaderStore } from '../../hybrid/components/partials/uploader/uploader.store';
import { UPLOADER_STATES } from '../../hybrid/components/partials/uploader/uploader.models';

const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const useAddUpload = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { setUploadStatus, setUploadPreview } = useUploaderStore(state => ({ setUploadStatus: state.setUploadStatus , setUploadPreview: state.setUploadPreview }))
    const handlePreview = async (file: RcFile) => {
        const preview = await getBase64(file);

        console.log('file!', file)

        setUploadPreview({ ...file, preview, src: `${window.location.origin}/uploads/${file.name}` })
    };

    const upload = (file: RcFile) => {
        const formData = new FormData();
        formData.append('file', file as RcFile);

        return fetch('/api/upload', {
            method: 'post',
            body: formData
        }).finally(() => file)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    return useMutation<void, unknown, RcFile>({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mutationFn: upload,
        onMutate: () => setUploadStatus(UPLOADER_STATES.UPLOADING),
        onSuccess: async (_result: never, file: RcFile) => {
            message.success(`${file?.name} file uploaded successfully.`)
            setUploadStatus(UPLOADER_STATES.DONE)
            await handlePreview(file)
        },
        onError: (_result: never, file: RcFile) => {
            message.error(`${file?.name} file upload failed.`)
            setUploadStatus(UPLOADER_STATES.READY)
        }
        // onSettled: () => setUploadStatus(UPLOADER_STATES.DONE)
    })
}