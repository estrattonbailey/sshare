export default s => `mailto:?body=${encodeURIComponent(s)}%0a%0a${encodeURIComponent(window.location.href)}`
