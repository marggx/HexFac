import { Item } from "../item";

export default class Iron extends Item {
    constructor() {
        super(
            "iron",
            "Iron",
            1,
            "A piece of iron",
            '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFIElEQVR4nO2by4/bRBzHhwMV9IAQQnDghITEDbjwOPE4QP+MavMSm4rGs6F5zTjjxPY6G9uJN9luJaDcKAdelYBrK7XiDaVcQOIh8Ti1AqmVgN0+hJG7ZBtST9psPB5r/ftIv8tevpsZ+zvj+c4PIQAAAAAAAAAAAAAAAAAAAAAAAAAAYqLM7Puo2Tut28PLHe+IH2Xp3eEmMez3GGN7YEJDYIzt1VZW/4h64Edl9df9SmvFL5Sbb8AEhNAw7IGowVetvr94iPk5TK9VpkSehkmYoGl5v0VuO87QLzWM7YEfVRbTAUzABLozvBKp3WhdP7+k3jD4W0U+hgkYg+j6g8GgibCb0FLIRqFQuB0m4T/qrW5lfrtZC7UbXmUP1h8Z6aceYvY+FGc3nAnAZCH1Az9C7fR/EWY33Amga9v/QNoxnOElkXbDeQM+lf27EwE23AdE2w0sxFOoas5Lou2GVwuYPorSTt10j4u2G36RLEo7quX9JNxuuDZE11HaadvDzTjshjMBn6G0Y419AYu1m5CdkELOobTT6g7+HB0VC7Wb0DeAnEBpp6J29hUPsTM5TK/G+ORfyWJyKovZQ2g3scSce4nhnhKVaNVN9/i0RIsxdg8xeid0J1r94A3V7cElYrofMMbuQMlNtLzfox74zviuKLCpsnqMo79HW1k9J1S/3fXz5ea7CKHbUNKoGa4n6serE7uiPFafmdSv6t1lUfqs4/nFinbdxkrqPpQ0mpb3a+S243B2RQoZ3qjf/1GIPjFD1hHyKkoaRoS+a93kIyyr0E8m9YM1Ikr9mm4Hdheuj+nXaLcmWqzj+YuV1kyJVrD4R6n/P7vh7KIwxneipFDTnZfn/eGGs+Zjuryjg7Ray35xXn3TnU0/ixtPoKQQbM92/Lp7W697Yak5014+U6KZbX3DfUuU3fAqj9UiSgqs0/9ZmN1grg0cHuk3rf73ouyGX+QoSgr6jInWrHaTu8lBWrs7/Fuk3XDWobMoCdRN737RdpObshAzxu661QV4p3aT6IW4rjsHRNtNjlelxmM1zd5/63YTsT5uPCV7/FFw41i43WDeU0hzdcM9Jtxu+G/hAdnjz/0CjdRuMGcCMDnSXPa+FW03/Amgr8sef6Tbw41Y7AaHTsDnQZ4Qj92E1jeyxx9ZvfWJ28hhZyfC6rzZO/zPuN0poWc3oopcTHeihelJzV69EOhXW8FRcdz6CbhlXTc7zy9WWl/Fnmgp9HSQaFV1+9liRfsi+FuMg381GPxMiT68qxKtsuQesSBRo6Z7UkyitrZJzN773EQtAYnWXpk9YtcStY53XqR+YJOFJfp2aKImO9FqSO4Rq7VtS5R+c+LMKaOQFxKYaHlSe8R4N/Tmqa1dWYi+Ql9JXqLlyO0RCzw6Sv2pH4EKOZOoRItI7hELDhRjTdQwvbx/fDGWnWjVJfeI1Qy7OK/+rGdO+YPq48lJtEy5PWINw3lnHv2dnDlll8hiYhItVXKPmGr1f4g7Ucsq9LXEJFqG5B6xtj3YEGk3U6+2yE60sOQesVK/f7fURE12olWV3CNW0zoLou2GV4WS+qT8RMuU2yPWMJw3RdvN1KstshMtVXKPmGr1vxNtN1MegKPSE6225B6xdnfwVxx2E65PzkpPtCzJPWLLY4ka/za0KH16QXqi1ZLcI9Za8S5eb76IVz+r0I+kJ1oVyT1iddN9rljRvtwViRoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgJ/AuaOSGNBnZD4gAAAABJRU5ErkJggg==">'
        );
    }
}
