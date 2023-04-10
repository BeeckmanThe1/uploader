import { ValuesOf } from '../../../../utils/typescript.utils';
import { RcFile } from 'antd/es/upload/interface';

export const UPLOADER_STATES = {
    READY: 'READY',
    UPLOADING: 'UPLOADING',
    DONE: 'DONE'
} as const

export type UploaderType = ValuesOf<typeof UPLOADER_STATES>
export type Preview = RcFile & {
    src: string,
    preview: string
}

export type UploadStore = {
    uploadStatus: UploaderType,
    uploadPreview: Preview,
    setUploadStatus: (_type: UploaderType) => void,
    setUploadPreview: (_preview: Preview) => void
}