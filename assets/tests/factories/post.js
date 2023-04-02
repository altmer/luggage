import { Factory } from 'rosie';
import UserFactory from './user';

export default new Factory()
  .sequence('id')
  .attrs({
    user_id: 101, // for now it is fixed
    title: 'Post title',
    body: 'Post body\nLorem ipsum...',
    inserted_at: '2017-01-02',
  }).sequence('user', index => (UserFactory.build({ id: index })));
