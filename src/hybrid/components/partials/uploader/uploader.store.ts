import { create, State } from 'zustand'
import { UPLOADER_STATES, UploaderType } from './uploader.models';
import { RcFile } from 'antd/es/upload/interface';

export interface UploadPreview extends RcFile {
    src: string
}
export const useUploaderStore = create((set) => ({
    uploadStatus: UPLOADER_STATES.READY,
    uploadPreview: {},
    // eslint-disable-next-line no-unused-vars
    setUploadStatus: (uploadStatus: UploaderType) => set((_state: State) => ({ uploadStatus })),
    // eslint-disable-next-line no-unused-vars
    setUploadPreview: (uploadPreview: UploadPreview) => set((_state: State) => ({ uploadPreview }))
}))