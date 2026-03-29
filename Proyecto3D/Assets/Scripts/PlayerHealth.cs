using UnityEngine;
using TMPro;

public class PlayerHealth : MonoBehaviour
{
    public float maxHealth = 100f;
    public float currentHealth;
    public TextMeshProUGUI healthText; // opcional, para HUD

    void Start()
    {
        currentHealth = maxHealth;
        UpdateHUD();
    }

    public void TakeDamage(float amount)
    {
        currentHealth -= amount;
        if (currentHealth < 0) currentHealth = 0;

        UpdateHUD();

        if (currentHealth <= 0)
            Debug.Log("Player dead!");
    }

    void UpdateHUD()
    {
        if (healthText != null)
            healthText.text = "Vida: " + currentHealth;
    }
}
