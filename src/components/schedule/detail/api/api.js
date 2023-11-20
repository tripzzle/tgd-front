const server = import.meta.env.VITE_SERVER;

export default {
    getScheduleDetails: (scheduleId) => {
        return `${server}/api/schedule/${scheduleId}`;
    },

}