<template>
  <div class="flex flex-col flex-1 overflow-hidden">
    <!-- Header bar -->
    <div class="flex items-center px-4 py-2.5 bg-blue-50 border-b border-blue-100 shrink-0">
      <svg class="w-4 h-4 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"/>
      </svg>
      <span class="text-sm text-gray-700 font-medium">notice</span>
      <div class="flex-1" />
      <button @click="showNewPost = true" class="px-4 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors">
        New post
      </button>
    </div>

    <!-- Posts list -->
    <div class="flex-1 overflow-auto px-4 py-3">
      <div v-for="post in posts" :key="post.id" class="border border-gray-200 rounded mb-3 p-4 bg-white hover:shadow-sm transition-shadow">
        <div class="flex items-start">
          <div class="flex-1">
            <button class="text-blue-600 font-semibold text-sm hover:underline mb-0.5">{{ post.title }}</button>
            <p class="text-sm text-gray-500 mb-0.5">{{ post.body }}</p>
            <p class="text-xs text-gray-400">{{ post.postedAt }} posted by {{ post.postedBy }}</p>
          </div>
          <div class="flex items-center gap-2 ml-4 shrink-0">
            <button @click="editPost(post)" class="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-300 rounded px-2.5 py-1 hover:bg-gray-50 transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>
              edit
            </button>
            <button @click="deletePost(post.id)" class="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 border border-gray-300 rounded px-2.5 py-1 hover:bg-gray-50 transition-colors">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="shrink-0 px-4 py-2 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-3">
      <span>1/1 page ({{ posts.length }} item{{ posts.length !== 1 ? 's' : '' }})</span>
      <button class="w-6 h-6 flex items-center justify-center rounded bg-blue-500 text-white text-xs">1</button>
    </div>

    <!-- New / Edit post modal -->
    <Teleport to="body">
      <div v-if="showNewPost || editingPost" class="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div class="absolute inset-0 bg-black/30" @click="closeModal" />
        <div class="relative bg-white rounded-lg shadow-xl w-[560px] flex flex-col overflow-hidden">
          <div class="flex items-center px-6 py-4 border-b border-gray-100">
            <h2 class="text-base font-semibold text-gray-800 flex-1 text-center">{{ editingPost ? 'Edit Post' : 'New Post' }}</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="px-6 py-5 space-y-4">
            <input v-model="postForm.title" type="text" placeholder="Title" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400" />
            <textarea v-model="postForm.body" rows="4" placeholder="Body" class="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" />
          </div>
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
            <button @click="closeModal" class="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">cancel</button>
            <button @click="savePost" class="px-6 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded">save</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { infoPosts as rawPosts } from '@/data/infoSharingData.js'

const posts = ref(rawPosts.map(p => ({ ...p })))
const showNewPost = ref(false)
const editingPost = ref(null)

const postForm = reactive({ title: '', body: '' })

let nextId = Math.max(...posts.value.map(p => p.id)) + 1

function editPost(post) {
  editingPost.value = post
  postForm.title = post.title
  postForm.body = post.body
}

function deletePost(id) {
  posts.value = posts.value.filter(p => p.id !== id)
}

function closeModal() {
  showNewPost.value = false
  editingPost.value = null
  postForm.title = ''
  postForm.body = ''
}

function savePost() {
  if (editingPost.value) {
    const post = posts.value.find(p => p.id === editingPost.value.id)
    if (post) { post.title = postForm.title; post.body = postForm.body }
  } else {
    posts.value.unshift({
      id: nextId++,
      title: postForm.title,
      body: postForm.body,
      postedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      postedBy: 'Fukuyasu Sekine',
    })
  }
  closeModal()
}
</script>
