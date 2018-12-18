import java.util.TreeMap;
import java.util.Map;
import java.util.Arrays;
import java.util.regex.Pattern;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import static java.util.stream.Collectors.*;
import static java.util.Comparator.*;
import java.util.Optional;

public class StreamPractice {

    static Pattern nonWord = Pattern.compile("[^\\p{L}']+");

    public static Map<Integer, Long> wordCountByLength(BufferedReader reader) {
            return reader
                .lines()
                .flatMap(Pattern.compile("[^\\p{L}']+")::splitAsStream)
                .filter(word -> !word.isEmpty())
                .collect(groupingBy(String::length, TreeMap::new, counting()));
    }

    public static class Batter {
        String name;
        String team;
        int atBats;
        int hits;
        double average;
        Batter(String line) {
            String[] components = line.split("\\s*,\\s*");
            this.name = components[0];
            this.team = components[1];
            this.atBats = Integer.parseInt(components[2]);
            this.hits = Integer.parseInt(components[3]);
            this.average = (double)this.hits / (double)this.atBats;
        }
    }

    public static Map<String, Optional<Batter>> bestBatterByTeam(BufferedReader reader) {
        return reader
            .lines()
            .map(person -> new Batter(person))
            .filter(person -> (person.atBats >= 100))
            .collect(groupingBy(person -> person.team, maxBy(comparing(person->person.average))));
    }
}
