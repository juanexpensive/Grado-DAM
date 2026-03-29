using UnityEngine;
using UnityEngine.InputSystem;
using static UnityEngine.Rendering.DebugUI;

public class PlayerCoin : MonoBehaviour
{
    float range2 = 0.1f;
    public LayerMask layer2;
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
        Debug.DrawRay(ray.origin, ray.direction * range2, Color.red);
        // 2. Comprobamos si el rayo choca con algo en la capa seleccionada
        if (Physics.Raycast(ray, out hit, range2, layer2))
        {
            if (CoinManager.Instance.coins < CoinManager.Instance.maxCoins) { 
                Collect(hit.collider.gameObject);
            }

        }
    }

    void Collect(GameObject go)
    {
        go.GetComponent<Renderer>().enabled = false;
        go.GetComponent<Collider>().enabled = false;
        StartCoroutine(respawn(go, 5f));
        CoinManager.Instance.AddCoin(1);
    }

    System.Collections.IEnumerator respawn(GameObject go, float seconds)
    {
        yield return new WaitForSeconds(seconds);
        go.GetComponent<Renderer>().enabled = true;
        go.GetComponent<Collider>().enabled = true;
    }
}

