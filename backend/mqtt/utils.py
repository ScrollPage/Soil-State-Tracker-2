def quote_decorator(func):
    replace_dict = {'"': r"\"", " ": ""}

    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)

        for pattern, result in replace_dict.items():
            res = res.replace(pattern, result)

        return res

    return wrapper
