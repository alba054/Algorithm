package main

import "fmt"

func EquilateralTriangle(n int) string {
	var s string = ""

	for i := n; i > 0; i-- {
		for j := 1; j < i-1; j++ {
			s += " "
		}

		for j := i - 1; j < n; j++ {
			if i != 1 {
				s += " *"
			} else {
				s += "* "
			}
		}
		s += "\n"
	}

	return s
}

func main() {
	var n int

	fmt.Scanln(&n)

	fmt.Println(EquilateralTriangle(n))
}
