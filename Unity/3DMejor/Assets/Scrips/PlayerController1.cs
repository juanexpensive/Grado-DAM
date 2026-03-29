using UnityEngine;
using UnityEngine.InputSystem;

public class C : MonoBehaviour
{
    public CharacterController controller;
    public float speed = 12f;
    public float gravity = -9.81f;
    private Vector2 moveInput;
    private Vector3 velocity;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        // 1. Resetear gravedad si toca suelo
        if (controller.isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }
        // 2. Lectura del Nuevo Input System (Teclado/WASD) y salto
        if (Keyboard.current != null)
        {
            float x = 0;
            float z = 0;

            if (Keyboard.current.wKey.isPressed) z = 1;
            if (Keyboard.current.sKey.isPressed) z = -1;
            if (Keyboard.current.aKey.isPressed) x = -1;
            if (Keyboard.current.dKey.isPressed) x = 1;
            /* Aquí va el código de correr */
            moveInput = new Vector2(x, z);
            /* Aquí va el código del salto */
        }

        // 3. Cálculo de dirección
        Vector3 move = transform.right * moveInput.x + transform.forward * moveInput.y;
        velocity.y += gravity * Time.deltaTime;
        Vector3 finalMovement = (move * speed) + (Vector3.up * velocity.y);
        controller.Move(finalMovement * Time.deltaTime);

        if (Keyboard.current.leftShiftKey.isPressed)
            speed = 20f;
        else
            speed = 12f;

        if(Keyboard.current.spaceKey.wasPressedThisFrame && controller.isGrounded)
        {
            velocity.y = Mathf.Sqrt(2f * -gravity * 3f); // 3f es la altura del salto
        }
        transform.localScale = new Vector3(1f, (Keyboard.current.cKey.isPressed)? 0.5f : 1f, 1f);

    }
}
