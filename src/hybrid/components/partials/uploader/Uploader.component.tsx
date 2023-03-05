import React, {useEffect, useState} from 'react';
import { Upload, Button, Space, Typography, message } from 'antd';

const { Dragger } = Upload;
import Background from '../../../../static/svgs/image.svg'
import { useAddUpload } from '../../../../client/hooks/upload.api.hooks';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { useUploaderStore } from './uploader.store';
import { UPLOADER_STATES } from './uploader.models';
import { ProgressBar } from '../../atoms/progress bar/progress-bar.atom';

const { Text, Title: AntdTitle } = Typography;

const Uploader = () => {
    const { mutate: uploadImg } = useAddUpload()
    const uploadConfig: UploadProps = {
        customRequest: ({ file, onSuccess }) => {
            uploadImg(file as RcFile)
            // this is needed to avoid antd's component to be in control of the call being done
            onSuccess('')
        },
        fileList: [],
        multiple: true
    };
    const handleUploadBtnClick = async () => {
        // this is not the react way, but antdesign's uploader does NOT let you pass a ref for the fileInput
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement
        fileInput.click()
    }

    return <div className={'iso-uploader-wrapper'}>
        <Space size={'small'} direction="vertical" className={'iso-uploader-headers'}>
            <AntdTitle level={2}>Upload your image</AntdTitle>
            <Text>File should be Jpeg, Png,...</Text>
        </Space>
        <Dragger {...uploadConfig}>
            <p>
                <img draggable={false} width={115} height={90}
                     alt={'Icon of some mountains as a placeholder for the image or file to be uploaded.'}
                     src={Background}/>
            </p>
            <Text type="secondary">Drag & Drop your image here</Text>
        </Dragger>
        <Space size={'small'} direction="vertical" style={{ display: 'flex', alignItems: 'center' }}>
            <Text type="secondary">Or</Text>
            <Button onClick={handleUploadBtnClick} type="primary">Choose a file</Button>
        </Space>
    </div>
}

const LinkCopier = ({ src }: { src: string }) => {
    const handleClick = async () => {
        try {
            await navigator.clipboard.writeText(src)
            message.success('Copied link')
        } catch(e){
            message.error('Copying failed')
        }
    }

    return <div className={'iso-link-copier'}>
        <div className={'iso-link-flex-box'}>
            <div>{src}</div>
            <Button type={'primary'} onClick={handleClick}>Copy link</Button>
        </div>
    </div>
}

const UploaderDone = ({ src }: { src: string }) => {
    return <div className={'iso-uploader-wrapper'}>
        <Space size={'small'} direction="vertical" className={'iso-uploader-headers'}>
            <AntdTitle level={2}>
                <i className="fa-solid fa-check" style={{
                    width: '30px',
                    height: '30px',
                    color: 'white',
                    borderRadius: '50%',
                    background: 'lightgreen'
                }}/>
            </AntdTitle>
            <Text>Uploaded successfully!</Text>
        </Space>
        <div className={'iso-uploaded-preview-wrapper'}>
            <img draggable={false}
                 alt={'Icon of some mountains as a placeholder for the image or file to be uploaded.'}
                 src={src || Background}/>
        </div>
        <LinkCopier src={src}/>
    </div>
}
const Loader = () => {
    return <div className={'iso-uploader-wrapper'}>
        <Space size={'small'} direction="vertical" className={'iso-uploader-headers iso-uploader-headers-left'}>
            <b>Uploading...</b>
            <ProgressBar/>
        </Space>
    </div>
}

export const UploadManager = () => {
    const [isHydrated, setIsHydrated] = useState(false)
    useEffect(() => setIsHydrated(true), [])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { uploadStatus, uploadPreview } = useUploaderStore((state: any) => ({
        uploadStatus: state.uploadStatus,
        uploadPreview: state.uploadPreview
    }))
    console.log('isHydrated:', isHydrated)

    return <>
        {uploadStatus === UPLOADER_STATES.READY ? <Uploader/> : null}

        {uploadStatus === UPLOADER_STATES.UPLOADING ? <Loader/> : null}

        {uploadStatus === UPLOADER_STATES.DONE ? <UploaderDone src={uploadPreview.src || uploadPreview.preview}/> : null}
    </>
};
