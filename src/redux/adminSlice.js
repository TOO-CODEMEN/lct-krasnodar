import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    materials: [],
    tasks: [],
    courses: [],
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        updateUser(state, action) {
            const index = state.users.findIndex(user => user.id == action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        deleteUser(state, action) {
            state.users = state.users.filter((user) => user.id != action.payload)
        },

        setMaterials(state, action) {
            state.materials = action.payload
        },
        updateMaterial(state, action) {
            const index = state.materials.findIndex(material => material.id == action.payload.id)
            if (index !== -1) {
                state.materials[index] = action.payload
            }
        },
        deleteMaterial(state, action) {
            state.materials = state.materials.filter((material) => material.id != action.payload)
        },

        setTasks(state, action) {
            state.tasks = action.payload
        },
        updateTask(state, action) {
            const index = state.tasks.findIndex(task => task.id == action.payload.id)
            if (index !== -1) {
                state.tasks[index] = action.payload
            }
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter((task) => task.id != action.payload)
        },

        setCourses(state, action) {
            state.courses = action.payload
        },
        updateCourse(state, action) {
            const index = state.courses.findIndex(course => course.id == action.payload.id)
            if (index !== -1) {
                state.courses[index] = action.payload
            }
        },
        deleteCourse(state, action) {
            state.courses = state.courses.filter((course) => course.id != action.payload)
        }
    },
})

export const { setUsers,
            deleteUser,
            updateUser,
            setMaterials,
            deleteMaterial,
            updateMaterial,
            setTasks,
            deleteTask,
            updateTask,
            setCourses,
            deleteCourse,
            updateCourse } = adminSlice.actions

export default adminSlice.reducer