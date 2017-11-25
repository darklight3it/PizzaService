using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PizzaService
{
    using Castle.Windsor;

    using Controllers;

    using Installers;

    public class Program
    {
        static void Main(string[] args)
        {
            var container = new WindsorContainer();

            container.Install(new ApplicationInstaller());

            var controller = container.Resolve<PizzaServiceController>();

        }
    }
}
