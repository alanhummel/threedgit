package tools;

import org.junit.Test;

public class GoodWindowsExecTest {

    @Test
    public void testExecute() {
        String osName = System.getProperty("os.name" );
        if( osName.startsWith( "Windows" ) ) {
            GoodWindowsExec.execute("dir /s");
            GoodWindowsExec.execute("cd C:\\Projects\\threedgit && git diff");
        } else if (osName.equals("Linux")) {
            GoodWindowsExec.execute("ls -al");
            GoodWindowsExec.execute("cd ~/Projects/C\\ and\\ C++/DataStructures/ && git diff");
        }
    }
}
