using UnityEngine;
using TMPro;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public TextMeshProUGUI enemiesText;
    public string winSceneName = "WinScene"; // nombre exacto de tu escena de victoria

    void Update()
    {
        UpdateEnemyCounter();
    }

    void UpdateEnemyCounter()
    {
        EnemyHealth[] enemies = FindObjectsOfType<EnemyHealth>();

        if (enemiesText != null)
        {
            enemiesText.text = "Enemies: " + enemies.Length;
        }

        if (enemies.Length == 0)
        {
            SceneManager.LoadScene(winSceneName);
        }
    }
}
