export default function (context) {
  if (context.store.getters.loggingUser && context.store.getters.loggingUser.details.user.department !== 'admin') {
    return context.redirect('/');
  }
}
