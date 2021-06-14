import md5 from 'md5';

export const generateAvatar = (id: string) => `http://gravatar.com/avatar/${md5(id)}?d=identicon`;
