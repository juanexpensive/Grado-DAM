package com.example.examen_juan_carovaquero

@Composable
fun ExamNotesScreen(
    onSave: (String, List<String>, List<Boolean>, String) -> Unit = { _,_,_,_ -> }
) {
    var title by remember { mutableStateOf("") }
    var noteText by remember { mutableStateOf("") }
    var items by remember { mutableStateOf(listOf<String>()) }
    var checkedItems by remember { mutableStateOf(listOf<Boolean>()) }
    var date by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {

        // -------- TÍTULO ----------
        Text("Título del Apunte", style = MaterialTheme.typography.titleLarge)
        OutlinedTextField(
            value = title,
            onValueChange = { title = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("Ej: Tema 5 – Fotosíntesis") }
        )

        Spacer(Modifier.height(20.dp))

        // -------- FECHA DE EXAMEN ----------
        Text("Fecha del Examen", style = MaterialTheme.typography.titleMedium)
        OutlinedTextField(
            value = date,
            onValueChange = { date = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("Ej: 12/03/2025") }
        )

        Spacer(Modifier.height(20.dp))

        // -------- APUNTES PRINCIPALES ----------
        Text("Notas / Contenido", style = MaterialTheme.typography.titleMedium)
        OutlinedTextField(
            value = noteText,
            onValueChange = { noteText = it },
            modifier = Modifier
                .fillMaxWidth()
                .height(150.dp),
            placeholder = { Text("Escribe aquí tus apuntes…") },
            maxLines = 10
        )

        Spacer(Modifier.height(20.dp))

        // -------- LISTA DE PUNTOS ----------
        Text("Puntos importantes", style = MaterialTheme.typography.titleMedium)

        var newItem by remember { mutableStateOf("") }

        Row {
            OutlinedTextField(
                value = newItem,
                onValueChange = { newItem = it },
                modifier = Modifier.weight(1f),
                placeholder = { Text("Añadir punto…") }
            )
            Spacer(Modifier.width(8.dp))
            Button(onClick = {
                if (newItem.isNotBlank()) {
                    items = items + newItem
                    checkedItems = checkedItems + false
                    newItem = ""
                }
            }) {
                Text("Añadir")
            }
        }

        Spacer(Modifier.height(12.dp))

        items.forEachIndexed { index, text ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(vertical = 4.dp)
            ) {
                Checkbox(
                    checked = checkedItems[index],
                    onCheckedChange = {
                        checkedItems = checkedItems.toMutableList().also { list ->
                            list[index] = it
                        }
                    }
                )
                Text(text, modifier = Modifier.weight(1f))

                IconButton(onClick = {
                    items = items.toMutableList().also { it.removeAt(index) }
                    checkedItems = checkedItems.toMutableList().also { it.removeAt(index) }
                }) {
                    Icon(Icons.Default.Delete, contentDescription = "Eliminar")
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        // -------- BOTONES ----------
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            OutlinedButton(onClick = {
                title = ""
                noteText = ""
                date = ""
                items = emptyList()
                checkedItems = emptyList()
            }) {
                Text("Limpiar")
            }

            Button(onClick = {
                onSave(title, items, checkedItems, noteText)
            }) {
                Text("Guardar")
            }
        }
    }
}
