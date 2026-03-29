using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerInteraction : MonoBehaviour
{
    public int chestCoins = 0;
    float range = 2f;
    public LayerMask layer;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        Ray ray = new Ray(transform.position, transform.forward);
        RaycastHit hit;
        // Visualización en el editor (solo visible en la escena)
        Debug.DrawRay(ray.origin, ray.direction * range, Color.red);
        // 2. Comprobamos si el rayo choca con algo en la capa seleccionada
        if (Physics.Raycast(ray, out hit, range, layer))
        {
            // Aquí el jugador está mirando un objeto interactuable
            if (Keyboard.current.eKey.wasPressedThisFrame)
            {
                TransferirMonedas();
            }
        }


    }

    void TransferirMonedas()
    {
        int monedasJugador = CoinManager.Instance.coins; 
        if (monedasJugador > 0)
        {
            chestCoins += monedasJugador; CoinManager.Instance.coins = 0; CoinManager.Instance.ResetColor(); // vuelve el texto a blanco
            CoinManager.Instance.ActualizarHUD(); UIChest.Instance.ActualizarBaul(chestCoins); 
        } 
    }    
}
 

