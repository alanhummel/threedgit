package tools;

public class GoodWindowsExec
{
    public static void main(String args[])
    {
        if (args.length < 1)
        {
            System.out.println("USAGE: java GoodWindowsExec <cmd>");
            System.exit(1);
        }
    }
    public static String execute(String aCommand)
    {
        String output = "";
        try
        {
            String osName = System.getProperty("os.name" );
            String[] cmd = new String[3];
            if( osName.equals( "Windows 95" ) ) {
                cmd[0] = "command.com" ;
                cmd[1] = "/C" ;
                cmd[2] = aCommand;
            }
            else if( osName.startsWith( "Windows" ) ) {
                cmd[0] = "cmd.exe" ;
                cmd[1] = "/C" ;
                cmd[2] = aCommand;
            } else if (osName.equals("Linux")) {
                cmd[0] = "bash";
                cmd[1] = "-c";
                cmd[2] = aCommand;
            }

            Runtime rt = Runtime.getRuntime();
            System.out.println("Executing " + cmd[0] + " " + cmd[1]
                    + " " + cmd[2]);
            Process proc = rt.exec(cmd);
            // any error message?
            StreamGobbler errorGobbler = new
                    StreamGobbler(proc.getErrorStream(), "ERROR");

            // any output?
            StreamGobbler outputGobbler = new
                    StreamGobbler(proc.getInputStream(), "OUTPUT");

            // kick them off
            errorGobbler.start();
            outputGobbler.start();

            // any error???
            errorGobbler.join();
            outputGobbler.join();
            int exitVal = proc.waitFor();
            System.out.println("ExitValue: " + exitVal);

            output = outputGobbler.getOutput();
            System.out.println("Final output: " + output);

        } catch (Throwable t)
        {
            t.printStackTrace();
        }
        return output;
    }
}