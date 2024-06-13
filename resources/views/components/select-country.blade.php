<div>
    <input type="text" list="country_list" {{ $attributes->merge(['class' => 'form-control']) }} placeholder="Search country...">
    <datalist id="country_list">
        @foreach ($countries as $country)
            <option value="{{ $country['code'] }}">{{ $country['name'] }}</option>
        @endforeach
    </datalist>
</div>
