import { create } from 'zustand'
import { Preview, UPLOADER_STATES, UploaderType, UploadStore } from './uploader.models';

export const useUploaderStore = create<UploadStore>((set) => ({
    uploadStatus: UPLOADER_STATES.READY,
    uploadPreview: null,
    setUploadStatus: (uploadStatus: UploaderType) => set(_state => ({ uploadStatus })),
    setUploadPreview: (uploadPreview: Preview) => set(_state => ({ uploadPreview }))
}))