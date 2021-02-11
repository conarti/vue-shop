<template>
  <teleport to="body">
    <div class="modal" :style="{ 'pointer-events': visible ? 'auto' : 'none' }">
      <transition name="slide-fade">
        <div
          class="modal-card"
          v-if="visible"
          :style="{ width, padding }">
          <div class="modal-card__header">
            <slot name="header">
              <h3>{{ title }}</h3>
            </slot>
            <el-button
              v-if="closeVisible"
              type="text"
              icon="el-icon-close"
              style="color: #303133;"
              @click="$emit('close')"
            ></el-button>
          </div>
          <div class="modal-card__content">
            <slot>
              <p>Необходимо добавить контент....</p>
            </slot>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div
          v-if="visible"
          class="modal-overlay"
          @click="$emit('close')"
        ></div>
      </transition>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'AppModal',
  emits: ['close'],
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '30px'
    },
    padding: {
      type: String,
      default: '2rem'
    },
    title: {
      type: String,
      required: true
    },
    closeVisible: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const toggleOverflow = status => status ?
        document.body.classList.add('modal') :
        document.body.classList.remove('modal')

    return {
      toggleOverflow
    }
  }
}
</script>

<style scoped>
.modal-card {
  position: absolute;
  z-index: 2001;
  left: 50%;
  top: 50%;
  border-radius: 4px;
  background-color: #fff;
  margin: 0 auto;
  padding: 2rem;
  color: #303133;
  transform: translate(-50%, -50%);
  text-align: center;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
}

body.modal {
  overflow: hidden;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
}
.modal-overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, .5);
}
.modal-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-card__header > h3 {
  font-weight: 500;
  margin: 0;
}
.modal-card__content {
  padding-top: 2rem;
}
</style>
