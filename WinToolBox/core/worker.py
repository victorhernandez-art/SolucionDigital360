"""
core/worker.py
Worker genérico para ejecutar tareas pesadas en un hilo separado,
evitando que la UI se congele. Reporta progreso y resultado via callbacks.
"""
import threading
from typing import Callable, Any


class Worker(threading.Thread):
    """
    Ejecuta `task_fn(*args, **kwargs)` en un hilo daemon.

    Parámetros:
        task_fn     : función a ejecutar en background
        on_progress : callback(message: str) para reportar progreso
        on_done     : callback(success: bool, result: Any) al terminar
        args/kwargs : argumentos para task_fn
    """

    def __init__(
        self,
        task_fn: Callable,
        on_progress: Callable[[str], None] = None,
        on_done: Callable[[bool, Any], None] = None,
        *args,
        **kwargs,
    ):
        super().__init__(daemon=True)
        self.task_fn = task_fn
        self.on_progress = on_progress or (lambda msg: None)
        self.on_done = on_done or (lambda ok, res: None)
        self.args = args
        self.kwargs = kwargs

    def run(self):
        try:
            # Inyectar progress_cb como primer argumento posicional
            result = self.task_fn(self.on_progress, *self.args, **self.kwargs)
            self.on_done(True, result)
        except Exception as exc:
            self.on_progress(f"Error: {exc}")
            self.on_done(False, str(exc))
