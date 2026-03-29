using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Database
{
    internal class Connection
    {
        public static string getConnectionString()
        {
            return "server=juancaro.database.windows.net;database=BBDD;uid=test1;pwd=abc1234!;trustServer\r\nCertificate=true;";
        }
    }
}
