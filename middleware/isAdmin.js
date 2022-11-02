export default function (context) {
  if (context.$auth.$state.user.department !== 'admin') {
    return context.redirect('/');
  }
}
