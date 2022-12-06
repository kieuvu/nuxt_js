export default function (context) {
  if (context.store.getters.loggingUser) {
    return context.redirect('/');
  }
}
