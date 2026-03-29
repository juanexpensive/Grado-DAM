using TMPro;
using UnityEngine;
using UnityEngine.UI; // o TMPro si usas TextMeshPro

public class CoinManager : MonoBehaviour
{
    public static CoinManager Instance;

    public int coins = 0;
    public int maxCoins = 5;

    public TMP_Text coinText;

    void Awake()
    {
        if (Instance == null)
            Instance = this;
        else
            Destroy(gameObject);
    }

    void Start()
    {
        ActualizarHUD();
    }

    public void AddCoin(int amount)
    {
        if (coins >= maxCoins)
            return; // No deja coger más monedas

        coins += amount;

        if (coins >= maxCoins)
        {
            coins = maxCoins;
            coinText.color = Color.red; // Cambia el texto a rojo
        }

        ActualizarHUD();
    }

    public void ActualizarHUD()
    {
        coinText.text = "Monedas: " + coins;
    }
    public void ResetColor()
    {
        coinText.color = Color.white;
    }

}
