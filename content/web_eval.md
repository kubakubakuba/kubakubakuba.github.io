# QtRVSim web evaluation

This is a web evaluation system for student RISC-V submissions in course [b35apo](https://cw.fel.cvut.cz/b222/courses/b35apo/en/start).
Users can submit their RISC-V (in some cases C) code, and it will be evaluated using [QtRvSim](https://github.com/cvut/qtrvsim) (will be checked for correct output),
and the runtime will be measured (in cycles).

The app is written in Python using Flask framework, the database system is PostgreSQL.

The main aim of the app is to provide a simple and easy way to implement a task (create a new task), and to be modular in a way
(so it is possible to extend this system by writing another evaluator module for another language).

I aim to extend the system, so it is able to evaluate other languages (C, C++, Python, ...).

The running version can be found on [https://eval.comparch.edu.cvut.cz](https://eval.comparch.edu.cvut.cz), repository is available on [GitLab](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web).

{{< figure src="../homepage.png" alt="Homepage" width="100%" class="center" >}}

{{< figure src="../submission.png" alt="Submission" width="100%" class="center" >}}