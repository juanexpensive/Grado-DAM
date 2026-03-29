using UnityEngine;
using TMPro;

public class HUD : MonoBehaviour
{
    public TextMeshProUGUI coinText;
    public int coins = 0;

    public void AddCoin(int amount = 1)
    {
        coins += amount;
        UpdateHUD();
    }

    public void SetCoins(int amount)
    {
        coins = amount;
        UpdateHUD();
    }

    void UpdateHUD()
    {
        if (coinText != null)
            coinText.text = "Monedas: " + coins;
    }
}
