using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace HelloWorld
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string nombre = txtNombre.Text;

            if (string.IsNullOrEmpty(nombre))
            {
                lblError.Text = "Debe introducir un nombre.";
                lblSaludo.Text = "";
            }
            else
            {
                lblError.Text = "";
                lblSaludo.Text = "Hola " + nombre;
            }
        }
    }
}
