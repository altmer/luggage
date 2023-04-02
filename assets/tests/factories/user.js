import { Factory } from 'rosie';

export default new Factory()
  .sequence('id')
  .sequence('email', index => (`mail-${index}@mail.test`))
  .attrs({
    name: 'John Doe',
    color: '2',
    initials: 'JD',
    avatar: {
      thumb: null,
    },
  });
