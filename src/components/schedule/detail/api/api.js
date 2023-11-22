const server = import.meta.env.VITE_SERVER;

export default {
    getScheduleDetailById: (scheduleId) => {
        return `${server}/api/schedule/${scheduleId}`;
    },
    getCommentsByScheduleId: (scheduleId) => {
        return `${server}/api/schedule/${scheduleId}/comment`;
    },
    postCommentsByScheduleId: (scheduleId) => {
        return `${server}/api/schedule/${scheduleId}/comment`;
    },
    deleteCommentById: (scheduleId, commentId) => {
        return `${server}/api/schedule/${scheduleId}/comment/${commentId}`;
    },
    postWishByScheduleId: (scheduleId) =>{
        return `${server}/api/schedule/${scheduleId}/wish`
    },
    postLikeByScheduleId: (scheduleId) =>{
        return `${server}/api/schedule/${scheduleId}/like`
    }
}