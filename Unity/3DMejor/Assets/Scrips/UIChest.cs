using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class UIChest : MonoBehaviour
{
    public static UIChest Instance;

    public TMP_Text chestText;

    void Awake()
    {
        Instance = this;
    }

    public void ActualizarBaul(int coins)
    {
        chestText.text = "Baúl: " + coins;
    }
}
