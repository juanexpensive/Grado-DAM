using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Database
{
    internal class Connection
    {
        public static String getConnectionString()
        {
            return "server=juancaro.database.windows.net;database=DDBB;uid=juan;pwd=abc12345!;trustServerCertificate=true;";
        }
    }
}

