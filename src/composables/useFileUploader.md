# `useFileUploader` Hook 使用文档

## 概述

`useFileUploader` 是一个用于处理文件上传功能的 Vue 组合式函数，提供了文件选择、验证、上传及结果处理的完整流程。该 hook 设计为高度可配置，支持自定义文件类型限制、文件大小限制、错误消息及上传服务实现。

## 基本用法

```vue
<template>
  <div>
    <button @click="triggerFileSelection" :disabled="isUploading">
      {{ isUploading ? '上传中...' : '选择文件' }}
    </button>
    
    <div v-if="uploadResult.error" class="error-message">
      {{ uploadResult.error.message }}
    </div>
    
    <div v-if="uploadResult.success" class="success-message">
      文件上传成功！
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileUploader } from '~/composables/useFileUploader'

const { triggerFileSelection, isUploading, uploadResult } = useFileUploader()
</script>
```

## 配置选项

### 上传设置 (`FileUploadSettings`)

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `allowedFileTypes` | `string[]` | `['doc', 'docx', 'zip']` | 允许上传的文件类型扩展名 |
| `maxFileSizeMB` | `number` | `100` | 允许上传的最大文件大小（MB） |
| `validateFilenameFormat` | `boolean` | `true` | 是否验证文件名格式（格式应为：岗位-姓名-邮箱） |
| `messages` | `Partial<UploaderMessages>` | 英文错误消息 | 自定义错误提示消息 |

### 消息配置 (`UploaderMessages`)

| 字段 | 默认值 | 描述 |
|------|--------|------|
| `noFile` | 'Please select a file' | 未选择文件时的错误消息 |
| `extError` | 'File has no extension' | 文件无扩展名时的错误消息 |
| `fileError` | 'Unsupported file type' | 文件类型不支持时的错误消息 |
| `sizeError` | 'File size exceeds the limit' | 文件大小超出限制时的错误消息 |
| `fileNameError` | 'Invalid file name format (should be: Position-Name-Email)' | 文件名格式不正确时的错误消息 |
| `serverError` | 'Server error, please try again later' | 服务器错误时的错误消息 |
| `uploadFailed` | 'File upload failed' | 上传失败时的错误消息 |

### 回调函数 (`UploadCallbacks`)

| 回调函数 | 参数 | 描述 |
|---------|------|------|
| `onProgress` | `uploadId: string`, `progressData: { progress: number }` | 上传进度更新时调用 |

## 返回值

| 属性/方法 | 类型 | 描述 |
|----------|------|------|
| `triggerFileSelection` | `() => void` | 触发文件选择对话框 |
| `isUploading` | `Ref<boolean>` | 上传状态 |
| `uploadResult` | `Ref<FileUploadResult>` | 上传结果对象 |
| `hasError` | `ComputedRef<boolean>` | 是否有错误发生 |
| `errorMessage` | `ComputedRef<string>` | 当前错误消息 |

### `FileUploadResult` 结构

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | `boolean` | 上传是否成功 |
| `fileKey` | `string` | 服务器返回的文件密钥 |
| `sdkKey` | `string` | SDK相关的文件密钥 |
| `originalFileName` | `string` | 原始文件名 |
| `error` | `UploadError` | 错误信息（如果失败） |

### `UploadError` 结构

| 字段 | 类型 | 描述 |
|------|------|------|
| `type` | `'validation' | 'upload' | 'server'` | 错误类型 |
| `message` | `string` | 错误消息 |
| `originalError` | `Error` | 原始错误对象（可选） |

## 进阶用法

### 自定义配置

```vue
<script setup lang="ts">
const { triggerFileSelection, isUploading, uploadResult } = useFileUploader(
  {
    onProgress: (uploadId, { progress }) => {
      console.log(`Upload ${uploadId} progress: ${progress}%`)
    }
  },
  {
    allowedFileTypes: ['pdf', 'jpg', 'png'],
    maxFileSizeMB: 50,
    messages: {
      fileError: 'Please upload PDF or image files only',
      sizeError: 'File size exceeds 50MB'
    }
  }
)
</script>
```

### 自定义上传服务

```typescript
// 自定义上传服务实现
const customUploadService: FileUploadService = {
  getUploadToken: async (fileName) => {
    // 自定义获取上传凭证的逻辑
    const result = await customApi.getToken({ fileName })
    return { token: result.token, upload_host: result.host }
  },
  
  saveFileMetadata: async (fileKey, token) => {
    // 自定义保存文件元数据的逻辑
    const result = await customApi.saveMetadata({ fileKey, token })
    return { file_key: result.key, sdk_key: result.sdkKey }
  }
}

// 使用自定义服务
const { triggerFileSelection } = useFileUploader(
  {},
  {},
  customUploadService
)
```

## 错误处理

hook 通过 `uploadResult.error` 返回标准化的错误对象，错误类型包括：

- `validation`：验证错误（如文件类型不匹配、文件过大）
- `upload`：上传过程中的错误（如网络问题）
- `server`：服务器端错误

示例错误处理：

```vue
<template>
  <div>
    <button @click="triggerFileSelection">上传文件</button>
    
    <div v-if="uploadResult.error" class="error-container">
      <div :class="`error-type-${uploadResult.error.type}`">
        {{ uploadResult.error.message }}
      </div>
      <button @click="uploadResult.error = undefined">关闭</button>
    </div>
  </div>
</template>
```

## 国际化支持

所有文本消息都可以通过 `messages` 配置项自定义，方便实现多语言支持：

```typescript
// 中文消息配置
const chineseMessages: Partial<UploaderMessages> = {
  noFile: '请选择文件',
  extError: '文件没有扩展名',
  fileError: '不支持的文件类型',
  sizeError: '文件大小超过限制',
  fileNameError: '文件名格式不正确（应为：岗位-姓名-邮箱）',
  serverError: '服务器错误，请稍后再试',
  uploadFailed: '文件上传失败'
}

// 使用中文消息
const { triggerFileSelection } = useFileUploader(
  {},
  { messages: chineseMessages }
)
```

## 示例：带进度条的上传组件

```vue
<template>
  <div class="file-uploader">
    <button @click="triggerFileSelection" :disabled="isUploading">
      {{ isUploading ? '上传中...' : '选择文件' }}
    </button>
    
    <div v-if="isUploading" class="progress-bar">
      <div :style="{ width: `${uploadProgress}%` }">{{ uploadProgress }}%</div>
    </div>
    
    <div v-if="uploadResult.error" class="error-message">
      {{ uploadResult.error.message }}
    </div>
    
    <div v-if="uploadResult.success" class="success-message">
      文件 {{ uploadResult.originalFileName }} 上传成功！
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFileUploader } from '~/composables/useFileUploader'

const uploadProgress = ref(0)

const { 
  triggerFileSelection, 
  isUploading, 
  uploadResult 
} = useFileUploader({
  onProgress: (_, data) => {
    uploadProgress.value = data.progress
  }
})

// 监听上传结果变化
watch(uploadResult, (newVal) => {
  if (newVal.success) {
    console.log('File uploaded successfully:', newVal)
  } else if (newVal.error) {
    console.error('Upload error:', newVal.error)
  }
})
</script>
```

以上就是 `useFileUploader` hook 的完整使用文档，涵盖了基本用法、配置选项、错误处理和国际化支持等方面。