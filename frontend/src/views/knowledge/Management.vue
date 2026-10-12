<!--
  ~ Licensed to the Apache Software Foundation (ASF) under one or more
  ~ contributor license agreements.  See the NOTICE file distributed with
  ~ this work for additional information regarding copyright ownership.
  ~ The ASF licenses this file to You under the Apache License, Version 2.0
  ~ (the "License"); you may not use this file except in compliance with
  ~ the License.  You may obtain a copy of the License at
  ~
  ~     http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
-->
<template>
  <div class="kb-management">
    <!-- <div class="header">
      <h2>知识管理</h2>
      <a-space>

      </a-space>
    </div> -->

    <a-card class="list-card">
      <a-button type="primary" @click="openAdd" class="add-btn">
        <template #icon><PlusOutlined /></template>
        Add Research Repository
      </a-button>
      <a-divider />
      <a-table
        :data-source="dataSource"
        :columns="columns"
        row-key="kb_id"
        bordered
        :scroll="{ x: 1000 }"
      >
        <template #emptyText>
          <div style="text-align: center; padding: 60px 0; color: #8c8c8c">
            <FileTextOutlined style="font-size: 64px; margin-bottom: 16px; opacity: 0.5" />
            <div style="font-size: 16px">No Research Repositories Found</div>
            <div style="font-size: 14px; margin-top: 8px; color: #bfbfbf">
              Click "Add Research Repository" above to create your first repository.
            </div>
          </div>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'kb_name'">
            <a-typography-link @click="openFiles(record)" class="kb-name-link">
              <FolderOpenOutlined style="margin-right: 8px; color: #667eea" />
              {{ record.kb_name }}
            </a-typography-link>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button size="small" @click="editKb(record)" class="action-btn">
                <EditOutlined />
                Edit
              </a-button>
              <a-popconfirm
                title="Delete this repository?"
                @confirm="removeKb(record.kb_id)"
                ok-text="Confirm"
                cancel-text="Cancel"
              >
                <a-button size="small" danger class="action-btn">
                  <DeleteOutlined />
                  Delete
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- Add/Edit Modal -->
    <a-modal
      v-model:open="editVisible"
      :title="editForm.kb_id ? 'Edit Repository' : 'Add Research Repository'"
      @ok="saveKb"
      :width="520"
      :ok-button-props="{
        style: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' },
      }"
    >
      <a-form
        :model="editForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        layout="vertical"
      >
        <a-form-item label="Repository Name" required>
          <a-input
            v-model:value="editForm.kb_name"
            placeholder="Enter repository name"
            :max-length="50"
            show-count
          >
            <template #prefix>
              <FolderOpenOutlined style="color: #667eea" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="Description & Scope">
          <a-textarea
            v-model:value="editForm.kb_description"
            placeholder="Enter repository description and research scope"
            :rows="3"
            :max-length="200"
            show-count
          />
        </a-form-item>
        <a-form-item label="Research Domain">
          <a-select v-model:value="editForm.category" placeholder="Select research domain" allow-clear>
            <a-select-option
              v-for="option in categoryOptions"
              :key="option.value"
              :value="option.value"
            >
              <span class="category-option">
                <span class="category-dot" :style="{ background: option.color }"></span>
                {{ option.label }}
              </span>
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- Document List & Upload Modal -->
    <a-modal
      v-model:open="filesVisible"
      :title="currentKb?.kb_name + ' - Document Management'"
      width="800px"
      :footer="null"
      :body-style="{ padding: '0' }"
    >
      <div class="files-header">
        <div class="stats-container">
          <a-statistic
            title="Total Documents"
            :value="currentKb?.files?.length || 0"
            :value-style="{ color: '#667eea', fontWeight: 600 }"
          />
          <a-statistic
            title="Total Size"
            :value="formatTotalSize(currentKb?.files)"
            :value-style="{ color: '#52c41a', fontWeight: 600 }"
          />
        </div>
        <a-upload
          multiple
          :before-upload="beforeUpload"
          :custom-request="handleBatchUpload"
          :show-upload-list="false"
        >
          <a-button type="primary">
            <template #icon><UploadOutlined /></template>
            Upload Documents
          </a-button>
        </a-upload>
      </div>

      <div style="padding: 24px">
        <a-list
          :data-source="currentKb?.files || []"
          item-layout="horizontal"
          :locale="{ emptyText: 'No documents uploaded yet' }"
        >
          <template #renderItem="{ item }">
            <a-list-item class="file-item">
              <a-list-item-meta>
                <template #title>
                  <div style="display: flex; align-items: center; gap: 8px">
                    <FileTextOutlined style="color: #667eea" />
                    <span style="font-weight: 600; color: #1a1a1a">{{ item.name }}</span>
                  </div>
                </template>
                <template #description>
                  <div style="color: #6c757d; font-size: 13px">
                    Size: {{ formatFileSize(item.size) }} · Uploaded:
                    {{ formatTime(item.uploadTime) }}
                  </div>
                </template>
              </a-list-item-meta>
              <template #actions>
                <a-space>
                  <a-tag :color="getStatusColor(item.status)" style="font-weight: 500">
                    {{ statusText(item.status) }}
                  </a-tag>
                  <a-popconfirm
                    title="Delete this document?"
                    @confirm="removeFile(item.id)"
                    ok-text="Confirm"
                    cancel-text="Cancel"
                  >
                    <a-button type="text" size="small" danger>
                      <template #icon><DeleteOutlined /></template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, h } from 'vue'
import { message } from 'ant-design-vue'
import {
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
} from '@ant-design/icons-vue'
import { ragService } from '@/services'
import { useKnowledgeStore, type KnowledgeBase, type KnowledgeFile } from '@/store/KnowledgeStore'

const store = useKnowledgeStore()

// Category options configuration
const categoryOptions = [
  { value: 'Agriculture & Policy', label: 'Agriculture & Public Policy', color: '#1890ff' },
  { value: 'Energy & Technology', label: 'Renewable Energy & Engineering', color: '#722ed1' },
  { value: 'Patents & Law', label: 'Patents & Sovereign Gazettes', color: '#52c41a' },
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'kb_id',
    key: 'kb_id',
    width: 260,
    ellipsis: true,
  },
  {
    title: 'Repository Name',
    dataIndex: 'kb_name',
    key: 'kb_name',
    ellipsis: true,
  },
  {
    title: 'Description & Scope',
    dataIndex: 'kb_description',
    key: 'kb_description',
    ellipsis: true,
  },
  {
    title: 'Domain',
    dataIndex: 'category',
    key: 'category',
    width: 180,
    render: (text: string) => {
      const colors: Record<string, string> = {
        'Agriculture & Policy': 'blue',
        'Energy & Technology': 'purple',
        'Patents & Law': 'green',
      }
      return h(
        'a-tag',
        {
          color: colors[text] || 'default',
          style: { fontWeight: 500, borderRadius: '12px' },
        },
        () => text || 'Uncategorized'
      )
    },
  },
  {
    title: 'Documents',
    key: 'fileCount',
    width: 110,
    render: (text: any, record: KnowledgeBase) => {
      return h(
        'span',
        {
          style: {
            color: '#667eea',
            fontWeight: 600,
            fontSize: '14px',
          },
        },
        record.files?.length || 0
      )
    },
  },
  {
    title: 'Actions',
    key: 'action',
    width: 180,
    fixed: 'right' as const,
  },
]

const dataSource = computed(() => store.knowledgeBases)

const editVisible = ref(false)
const editForm = reactive<{
  kb_id?: string
  kb_name: string
  kb_description: string
  category: string
}>({
  kb_name: '',
  kb_description: '',
  category: '',
})

function openAdd() {
  Object.assign(editForm, { kb_id: undefined, kb_name: '', kb_description: '', category: '' })
  editVisible.value = true
}

function editKb(record: KnowledgeBase) {
  Object.assign(editForm, record)
  editVisible.value = true
}

function saveKb() {
  if (!editForm.kb_name) {
    message.warning('Please enter repository name')
    return
  }

  const action = editForm.kb_id ? 'updated' : 'created'
  const params = {
    kb_name: editForm.kb_name,
    kb_description: editForm.kb_description,
    category: editForm.category || 'General',
  }

  if (editForm.kb_id) {
    store.updateKnowledgeBase(editForm.kb_id, params)
  } else {
    store.addKnowledgeBase(params)
  }

  message.success(`Repository ${action} successfully`)
  editVisible.value = false
}

function removeKb(id: string) {
  if (store.deleteKnowledgeBase(id)) {
    message.success('Repository deleted successfully')
  }
}

// Document Management
const filesVisible = ref(false)
const currentKb = ref<KnowledgeBase | null>(null)

function openFiles(record: KnowledgeBase) {
  currentKb.value = record
  filesVisible.value = true
}

function beforeUpload(file: File) {
  // Check file type
  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  if (!allowedTypes.includes(file.type)) {
    message.error('Only PDF, TXT, DOC, and DOCX files are supported')
    return false
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024
  if (file.size > maxSize) {
    message.error('File size cannot exceed 10MB')
    return false
  }

  return true
}

const statusMap = {
  success: { text: 'Indexed', color: 'success' },
  error: { text: 'Failed', color: 'error' },
  processing: { text: 'Processing', color: 'processing' },
  uploading: { text: 'Uploading', color: 'processing' },
}

function statusText(status: KnowledgeFile['status']) {
  return statusMap[status]?.text || 'Unknown'
}

function getStatusColor(status: KnowledgeFile['status']) {
  return statusMap[status]?.color || 'default'
}

function formatTime(time: string) {
  return new Date(time).toLocaleString()
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatTotalSize(files?: KnowledgeFile[]): string {
  if (!files || files.length === 0) return '0 B'
  const total = files.reduce((sum, file) => sum + file.size, 0)
  return formatFileSize(total)
}

async function handleBatchUpload(options: any) {
  if (!currentKb.value) {
    message.error('Please select a repository first')
    return
  }

  const file = options.file as File
  const kb = currentKb.value

  // Add document to store
  const added = store.addFileToKnowledgeBase(kb.kb_id, {
    name: file.name,
    size: file.size,
    uploadTime: new Date().toISOString(),
  })

  if (!added) {
    message.error('Failed to add document')
    options.onError?.(new Error('Failed to add document'))
    return
  }

  try {
    const formData = new FormData()
    formData.append('kb_id', kb.kb_id)
    formData.append('kb_name', kb.kb_name)
    formData.append('kb_description', kb.kb_description || '')
    formData.append('category', kb.category || 'General')
    formData.append('files', file, file.name)

    const res = await ragService.batchUploadFiles({
      files: file,
      session_id: kb.kb_id,
    })

    store.updateFileStatus(kb.kb_id, added.id, 'success')
    message.success(`${file.name} uploaded and indexed successfully`)
    options.onSuccess?.(res)
  } catch (error: any) {
    console.error('Document upload error:', error)

    store.updateFileStatus(kb.kb_id, added.id, 'error')

    let errorMessage = `${file.name} upload failed`
    if (error.code === 'ECONNABORTED') {
      errorMessage += ': Request timed out'
    } else if (error.response?.status === 413) {
      errorMessage += ': File too large'
    } else if (error.response?.status === 415) {
      errorMessage += ': Unsupported file format'
    } else if (error.response?.data?.message) {
      errorMessage += `: ${error.response.data.message}`
    }

    message.error(errorMessage)
    options.onError?.(error)
  }
}

function removeFile(fileId: string) {
  if (!currentKb.value) return
  if (store.removeFileFromKnowledgeBase(currentKb.value.kb_id, fileId)) {
    message.success('Document deleted successfully')
  }
}

onMounted(() => {
  store.initSampleData()
})
</script>

<style lang="less" scoped>
.category-option {
  display: flex;
  align-items: center;
}

.category-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.kb-management {
  padding: 24px;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #f5f5f5;
  min-height: 100vh;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding: 16px 24px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f0;

    h2 {
      color: #262626;
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
  }

  .list-card {
    background: #fff;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    overflow: hidden;

    :deep(.ant-table) {
      .ant-table-thead > tr > th {
        background: #fafafa;
        color: #262626;
        font-weight: 500;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
        padding: 12px 16px;
      }

      .ant-table-tbody > tr > td {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
      }

      .ant-table-tbody > tr:hover > td {
        background-color: #fafafa;
      }
    }
  }

  .add-btn {
    border-radius: 6px;
  }
}

.files-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;

  .stats-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

// 全局样式增强
:deep(.ant-modal-content) {
  border-radius: 8px;
}

:deep(.ant-modal-header) {
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;

  .ant-modal-title {
    color: #262626;
    font-weight: 500;
    font-size: 16px;
  }
}

:deep(.ant-list-item) {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 8px;
  background: #fff;
  border: 1px solid #f0f0f0;
}

:deep(.ant-btn) {
  border-radius: 6px;
}
</style>
