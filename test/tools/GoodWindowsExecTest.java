package tools;

import org.junit.Test;

public class GoodWindowsExecTest {

    @Test
    public void testExecute() {
        GoodWindowsExec.execute("ls -al");
        GoodWindowsExec.execute("cd ~/Projects/C\\ and\\ C++/DataStructures/ && git diff");
    }
}
