// 动态设置host
export const host = !/123.206.55.50/.test(window.location.host)?'http://169.254.55.5:8889': 'http://123.206.55.50:8889';

