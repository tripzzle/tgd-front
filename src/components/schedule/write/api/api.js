const server = import.meta.env.VITE_SERVER;

export default {
    getAttractionsByTitle: (title, sidoCode) => {
        return `${server}/api/attraction?keyword=${title}${sidoCode !== '0' ? `&sidoCode=${sidoCode}` : ''}`;
    },

    getAttractionsByLatLng: (lat, lng, height, width, page) => {
        return `${server}/api/attraction/all?latitude=${lat.value}&longitude=${lng.value}&height=${height.value}&width=${width.value}`;
    }
}