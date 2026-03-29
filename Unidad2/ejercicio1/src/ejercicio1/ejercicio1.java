package ejercicio1;
import java.io.File;                  
import java.io.FileNotFoundException; 
import java.util.Scanner; 



public class ejercicio1 {
	  public static void main(String[] args) {
		  
	    File myObj = new File("src/ejercicio1/carpetas.txt");

	    try (Scanner sc = new Scanner(myObj)) {
	      while (sc.hasNextLine()) {
	        String data = "C:\\Users\\juan.caro\\"+sc.nextLine();
	        new File (data).mkdirs();
	      }
	    } catch (FileNotFoundException e) {
	      System.out.println("An error occurred.");
	      e.printStackTrace();
	    }
	  }
}




