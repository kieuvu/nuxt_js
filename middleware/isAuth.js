export default function (context) {
  if (!context.store.getters.loggingUser) {
    context.redirect('/login');
  }
}
