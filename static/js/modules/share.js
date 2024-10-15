const share = data => share.support && !!navigator.share(data);

share.support = 'share' in navigator;

export default share;