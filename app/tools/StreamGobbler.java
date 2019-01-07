package tools;

import java.util.*;
import java.io.*;
class StreamGobbler extends Thread
{
    InputStream is;
    String type;
    StringBuffer output = new StringBuffer();

    StreamGobbler(InputStream is, String type)
    {
        this.is = is;
        this.type = type;
    }

    public void run()
    {
        try
        {
            InputStreamReader isr = new InputStreamReader(is);
            BufferedReader br = new BufferedReader(isr);
            String line=null;
            while ( (line = br.readLine()) != null) {
//                System.out.println(type + ">" + line);
                output.append(line + "\r\n");
            }
        } catch (IOException ioe)
        {
            ioe.printStackTrace();
        }
    }
    public String getOutput()
    {
        return this.output.toString();
    }
}
