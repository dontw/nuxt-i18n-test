export default function (context) {
    // get current route
    let currRoute = context.route.path.split("/")[1]
    // check the route is in blocked section or not
    if (currRoute === 'test') {
        context.redirect('/login')
    } else {
        return
    }
}
