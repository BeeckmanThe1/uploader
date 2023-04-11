import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { RcFile } from 'antd/es/upload/interface';
import { useUploaderStore } from '../../hybrid/components/partials/uploader/uploader.store';
import { Preview, UPLOADER_STATES } from '../../hybrid/components/partials/uploader/uploader.models';

const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

export const useAddUpload = () => {
    const { setUploadStatus, setUploadPreview } = useUploaderStore(state => ({
        setUploadStatus: state.setUploadStatus,
        setUploadPreview: state.setUploadPreview
    }))
    const handlePreview = async (file: RcFile) => {
        const preview = await getBase64(file);

        setUploadPreview({ ...file, preview, src: `${window.location.origin}/uploads/${file.name}` } as Preview)
    };

    return useMutation<RcFile, unknown, RcFile>(['upload-img'], (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // todo can we type fetch better? if not; use axios
        return fetch('/api/upload', {
            method: 'post',
            body: formData
        }).finally(() => file) as unknown as Promise<RcFile>
    }, {
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
    })
}
