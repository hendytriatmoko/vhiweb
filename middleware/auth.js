export default function ({ app, route, redirect }) {
  if (route.path == '/') {
    if (app.$cookies.get('user') != null) {
      return redirect('/users')
    }
  }else{
    if (app.$cookies.get('user') == null) {
      return redirect('/')
    }
  }

  // if (route.path == '/users') {
  //   if (app.$cookies.get('user') == null) {
  //     app.$cookies.set('prevUrl', route.path)
  //     return redirect('/login')
  //   }
  // }
}
