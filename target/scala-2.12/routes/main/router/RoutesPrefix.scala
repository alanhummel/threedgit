// @GENERATOR:play-routes-compiler
// @SOURCE:/home/ahummel/Projects/threedgit/conf/routes
// @DATE:Fri Nov 16 11:02:30 EST 2018


package router {
  object RoutesPrefix {
    private var _prefix: String = "/"
    def setPrefix(p: String): Unit = {
      _prefix = p
    }
    def prefix: String = _prefix
    val byNamePrefix: Function0[String] = { () => prefix }
  }
}
