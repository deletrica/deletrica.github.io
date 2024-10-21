const share = data => share.support && navigator.share(data).catch(err => err.name !== 'AbortError' && console.error(err));

share.support = 'share' in navigator;

export default share;