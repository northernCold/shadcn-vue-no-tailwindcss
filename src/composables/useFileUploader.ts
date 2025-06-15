// composables/useFileUploader.ts
import { ref, onUnmounted, type Ref, computed } from 'vue'
// import * as api from '~/http/api'

/**
 * Configuration interface for uploader messages
 */
interface UploaderMessages {
  noFile: string
  extError: string
  fileError: string
  sizeError: string
  fileNameError: string
  serverError: string
  uploadFailed: string
}

/**
 * Standardized error type for upload operations
 */
interface UploadError {
  type: 'validation' | 'upload' | 'server'
  message?: string
  originalError?: Error
}

/**
 * Result structure for file upload operations
 */
interface FileUploadResult {
  fileKey?: string
  sdkKey?: string
  originalFileName?: string
  success: boolean
  error?: UploadError
}

/**
 * Configuration settings for the file uploader
 */
interface FileUploadSettings {
  allowedFileTypes?: string[]
  maxFileSizeMB?: number
  validateFilenameFormat?: boolean
  messages?: Partial<UploaderMessages>
}

/**
 * Default error messages in English
 */
const defaultMessages: UploaderMessages = {
  noFile: 'Please select a file',
  extError: 'File has no extension',
  fileError: 'Unsupported file type',
  sizeError: 'File size exceeds the limit',
  fileNameError: 'Invalid file name format (should be: Position-Name-Email)',
  serverError: 'Server error, please try again later',
  uploadFailed: 'File upload failed'
}

/**
 * Validate file properties and return standardized error if invalid
 * @param file - The file to validate
 * @param settings - Upload settings including allowed types and size limits
 * @returns UploadError object if validation fails, otherwise null
 */
const validateFile = (
  file: File, 
  settings: Required<FileUploadSettings>
): UploadError | null => {
  if (!file) {
    return {
      type: 'validation',
      message: settings.messages.noFile
    }
  }

  const fileName = file.name
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || ''
  
  if (!fileName.includes('.')) {
    return {
      type: 'validation',
      message: settings.messages.extError
    }
  }
  
  if (!settings.allowedFileTypes.includes(fileExtension)) {
    return {
      type: 'validation',
      message: settings.messages.fileError
    }
  }
  
  const maxSizeInBytes = settings.maxFileSizeMB * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    return {
      type: 'validation',
      message: settings.messages.sizeError
    }
  }
  
  if (settings.validateFilenameFormat) {
    const nameComponents = fileName.split('.').slice(0, -1).join('.').split('-')
    
    if (nameComponents.length !== 3) {
      return {
        type: 'validation',
        message: settings.messages.fileNameError
      }
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(nameComponents[2])) {
      return {
        type: 'validation',
        message: settings.messages.fileNameError
      }
    }
  }
  
  return null
}

/**
 * Interface for file upload service implementations
 */
interface FileUploadService {
  getUploadToken: (fileName: string) => Promise<{ token: string; upload_host: string }>
  saveFileMetadata: (fileKey: string, token: string) => Promise<{ file_key: string; sdk_key: string }>
}

/**
 * Default implementation of the file upload service
 */
const defaultFileUploadService: FileUploadService = {
  getUploadToken: async (fileName) => {
    // const result = await api.getFileToken({
    //   business: 'resume_exam_attach',
    //   file_name: fileName,
    //   noApiTip: true,
    // })
    // return { 
    //   token: result.token, 
    //   upload_host: result.upload_host 
    // }
    return {
      token: 'token',
      upload_host: 'upload_host'
    }
  },
  
  saveFileMetadata: async (fileKey, token) => {
    // const result = await api.fileSave({
    //   file_key: fileKey,
    //   noApiTip: true,
    //   token,
    // })
    // return { 
    //   file_key: result.file_key, 
    //   sdk_key: result.sdk_key 
    // }

    return {
      file_key: 'file_key',
      sdk_key: 'sdk_key'
    }
  }
}

/**
 * Callback type for upload success event
 */
type UploadSuccessCallback = (id: string, data: { url: string }) => void

/**
 * Callback type for upload error event
 */
type UploadErrorCallback = (error: Error) => void

/**
 * Callback type for upload progress event
 */
type UploadingCallback = (id: string, data: { progress: number }) => void

/**
 * Interface for uploader event callbacks
 */
interface UploaderEvents {
  success?: UploadSuccessCallback
  error?: UploadErrorCallback
  uploading?: UploadingCallback
}

/**
 * Wrapper function to create SDK uploader instance with type-safe event handlers
 * @param file - The file to upload
 * @param token - Upload token
 * @param host - Upload host URL
 * @param events - Event callbacks
 * @returns SDK uploader instance
 */
const createSdkUploader = (
  file: File,
  token: string,
  host: string,
  events: UploaderEvents
) => {
  return new window.uploadSdk.MultiUpload({
    file,
    token,
    host,
    events: {
      success: (id: string, data: { url: string }) => {
        events.success?.(id, data)
      },
      error: (error: Error) => {
        events.error?.(error)
      },
      uploading: (id: string, data: { progress: number }) => {
        events.uploading?.(id, data)
      }
    }
  })
}

/**
 * Callback interface for upload progress events
 */
interface UploadCallbacks {
  onProgress?: (uploadId: string, progressData: { progress: number }) => void
}

/**
 * Composable for handling file uploads
 * @param callbacks - Optional callbacks for upload events
 * @param settings - Configuration settings for the uploader
 * @param uploadService - Service implementation for upload operations
 * @returns Object containing uploader state and control functions
 */
export const useFileUploader = (
  callbacks: UploadCallbacks = {},
  settings: FileUploadSettings = {},
  uploadService: FileUploadService = defaultFileUploadService
) => {
  const isUploading: Ref<boolean> = ref(false)
  const uploadResult: Ref<FileUploadResult> = ref({ success: false })
  let fileInputElement: HTMLInputElement | null = null
  
  // Merge default settings with user-provided settings
  const mergedSettings: Required<FileUploadSettings> = {
    allowedFileTypes: settings.allowedFileTypes || ['doc', 'docx', 'zip'],
    maxFileSizeMB: settings.maxFileSizeMB || 100,
    validateFilenameFormat: settings.validateFilenameFormat !== false,
    messages: { ...defaultMessages, ...(settings.messages || {}) }
  }

  /**
   * Create or retrieve the file input element
   * @returns HTML input element for file selection
   */
  const createFileInput = () => {
    if (fileInputElement) return fileInputElement
    
    const input = document.createElement('input')
    input.type = 'file'
    input.style.display = 'none'
    input.multiple = false
    input.accept = mergedSettings.allowedFileTypes.map(type => `.${type}`).join(', ')
    
    document.body.appendChild(input)
    fileInputElement = input
    return input
  }

  /**
   * Handle file selection event
   * @param event - Change event from file input
   */
  const handleFileSelection = (event: Event) => {
    const inputElement = event.target as HTMLInputElement
    const selectedFile = inputElement?.files?.[0]
    
    if (!selectedFile) {
      uploadResult.value = {
        success: false,
        error: {
          type: 'validation',
          message: mergedSettings.messages.noFile
        }
      }
      return
    }
    
    const validationError = validateFile(selectedFile, mergedSettings)
    if (validationError) {
      uploadResult.value = {
        success: false,
        error: validationError
      }
      return
    }
    
    initiateFileUpload(selectedFile)
  }

  /**
   * Trigger file selection dialog
   */
  const triggerFileSelection = () => {
    const input = createFileInput()
    input.addEventListener('change', handleFileSelection)
    input.click()
  }

  /**
   * Upload file to SDK storage
   * @param file - File to upload
   * @param uploadConfig - Upload configuration including token and host
   * @returns Promise resolving with file key on success
   */
  const uploadFileToSdk = (
    file: File, 
    uploadConfig: { uploadToken: string; uploadHost: string }
  ) => {
    return new Promise<{ file_key: string }>((resolve, reject) => {
      createSdkUploader(file, uploadConfig.uploadToken, uploadConfig.uploadHost, {
        success: (_, data) => {
          resolve({ file_key: data.url })
        },
        error: (error) => {
          reject({
            type: 'upload',
            message: mergedSettings.messages.uploadFailed,
            originalError: error
          })
        },
        uploading: (id, data) => {
          callbacks.onProgress?.(id, data)
        }
      })
    })
  }

  /**
   * Initiate the complete file upload process
   * @param fileToUpload - File to upload
   */
  const initiateFileUpload = async (fileToUpload: File) => {
    isUploading.value = true
    uploadResult.value = { success: false }
    
    try {
      const originalFileName = fileToUpload.name
      
      // Get upload token
      const uploadTokenInfo = await uploadService.getUploadToken(originalFileName)

      // Upload file to storage service
      const uploadResultData = await uploadFileToSdk(fileToUpload, {
        uploadToken: uploadTokenInfo.token,
        uploadHost: uploadTokenInfo.upload_host,
      })

      // Save file metadata to application server
      const saveResult = await uploadService.saveFileMetadata(
        uploadResultData.file_key, 
        uploadTokenInfo.token
      )

      uploadResult.value = {
        success: true,
        fileKey: saveResult.file_key,
        sdkKey: saveResult.sdk_key,
        originalFileName
      }
    } catch (error: any) {
      uploadResult.value = {
        success: false,
        error: {
          type: 'server',
          message: mergedSettings.messages.serverError,
          originalError: error
        }
      }
    } finally {
      isUploading.value = false
    }
  }

  /**
   * Clean up resources when component unmounts
   */
  onUnmounted(() => {
    fileInputElement?.removeEventListener('change', handleFileSelection)
    fileInputElement?.parentNode?.removeChild(fileInputElement)
    fileInputElement = null
  })

  /**
   * Computed property indicating if there is an error
   */
  const hasError = computed(() => !uploadResult.value.success && !!uploadResult.value.error)
  
  /**
   * Computed property returning the error message
   */
  const errorMessage = computed(() => uploadResult.value.error?.message || '')

  return {
    triggerFileSelection,
    isUploading,
    uploadResult,
    hasError,
    errorMessage
  }
}