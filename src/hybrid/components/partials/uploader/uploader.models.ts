import { ValuesOf } from '../../../../utils/typescript.utils';

export const UPLOADER_STATES = {
    READY: 'READY',
    UPLOADING: 'UPLOADING',
    DONE: 'DONE'
} as const

export type UploaderType = ValuesOf<typeof UPLOADER_STATES>